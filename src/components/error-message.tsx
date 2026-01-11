import * as React from "react";

export const ErrorMessage: React.FC<{ message: string }> = ({ message }) => (
  <div className="flex items-center gap-2 mt-2 text-red-400 text-sm">
    {message}
  </div>
);
