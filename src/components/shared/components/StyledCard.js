import { styled } from '@mui/material/styles';
import { Card } from "@mui/material";

export const StyledCard = styled(Card)(({ theme }) => ({
	"&.MuiPaper-rounded": {
		border: 0,
		borderRadius: '30px',
	},
}));
