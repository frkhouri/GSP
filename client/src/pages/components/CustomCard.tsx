import Card from '@mui/material/Card';

const CustomCard = ({ children }: any) => {
  return (
    <Card elevation={0} style={{ margin: '10px 15px', borderRadius: '14px' }}>
      {children}
    </Card>
  );
};

export default CustomCard;
