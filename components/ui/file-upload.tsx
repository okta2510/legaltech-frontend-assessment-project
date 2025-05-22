"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Upload, File, X } from "lucide-react";

interface FileUploadProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onFileChange: (file: File | null) => void;
  accept?: string;
  maxSize?: number;
  label?: string;
  className?: string;
  selectedFile?: File | null;
  error?: string;
}

export function FileUpload({
  onFileChange,
  accept = ".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  maxSize = 5 * 1024 * 1024, // 5MB default
  label = "Upload file",
  className,
  selectedFile,
  error,
  ...props
}: FileUploadProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = React.useState(false);
  const [localError, setLocalError] = React.useState<string | undefined>(error);

  const handleFile = (file: File | null) => {
    if (!file) {
      onFileChange(null);
      setLocalError(undefined);
      return;
    }

    // Validate file type
    const fileType = file.type;
    const validTypes = accept.split(',').map(type => {
      if (type.startsWith('.')) {
        // Convert extensions to appropriate MIME types
        if (type === '.pdf') return 'application/pdf';
        if (type === '.doc') return 'application/msword';
        if (type === '.docx') return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        return type;
      }
      return type;
    });

    if (!validTypes.includes(fileType)) {
      setLocalError("Invalid file type. Please upload a PDF or Word document.");
      onFileChange(null);
      return;
    }

    // Validate file size
    if (file.size > maxSize) {
      setLocalError(`File is too large. Maximum size is ${maxSize / (1024 * 1024)}MB.`);
      onFileChange(null);
      return;
    }

    setLocalError(undefined);
    onFileChange(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const removeFile = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    onFileChange(null);
    setLocalError(undefined);
  };

  React.useEffect(() => {
    setLocalError(error);
  }, [error]);

  return (
    <div className={cn("space-y-2", className)}>
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-6 transition-colors",
          dragActive ? "border-primary bg-primary/5" : "border-input",
          (localError || error) && "border-destructive",
          "cursor-pointer text-center"
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <input
          type="file"
          ref={inputRef}
          className="hidden"
          onChange={handleChange}
          accept={accept}
          {...props}
        />
        
        {selectedFile ? (
          <div className="flex items-center justify-center space-x-2">
            <File className="h-6 w-6 text-primary" />
            <span className="font-medium text-primary">{selectedFile.name}</span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="ml-2 h-8 w-8 p-0"
              onClick={(e) => {
                e.stopPropagation();
                removeFile();
              }}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Remove file</span>
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-xs text-muted-foreground">
            <Upload className="mb-2 h-10 w-10 text-muted-foreground" />
            <p className="mb-1 font-medium text-base">{label}</p>
            <p>Drag and drop or click to upload</p>
            <p className="text-xs mt-1">PDF or Word documents (max {maxSize / (1024 * 1024)}MB)</p>
          </div>
        )}
      </div>
      
      {(localError || error) && (
        <p className="text-sm font-medium text-destructive">{localError || error}</p>
      )}
    </div>
  );
}