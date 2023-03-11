import * as React from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import styled from 'styled-components';
const BasicMenuContainer = styled.div`
  display: flex;
  gap: 7px;
`
export const ActionMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  return (
    <BasicMenuContainer>
      <EditIcon fontSize="medium"  />
      <VisibilityIcon fontSize="medium"  />
      <DeleteForeverIcon color='error' fontSize="medium"  />
    </BasicMenuContainer>
  );
}
