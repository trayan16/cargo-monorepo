import * as React from 'react';

interface ContainerFormProps {
    handleToggleOpen?: () => void;
    open?: boolean;
  }
export const ContainerForm: React.FC<ContainerFormProps> = () => {

  return (
    <div>
      ContainerForm
    </div>
  );
}