import * as React from 'react';

interface VehicleFormProps {
    handleToggleOpen?: () => void;
    open?: boolean;
  }
export const VehicleForm: React.FC<VehicleFormProps> = () => {

  return (
    <div>
      Vehicle Form
    </div>
  );
}