import ErrorMessage from "../errorMessage/errorMessage"
import { Link } from "react-router-dom"


const Page404: React.FC = () => {
   return (
      <div>
         <ErrorMessage />
         <p style={{ 'textAlign': 'center', 'fontSize': '24px', 'fontWeight': 'bold', 'textTransform': 'uppercase' }} >Page doesn't exist</p>
         <Link style={{ 'textAlign': 'center', 'fontSize': '24px', 'fontWeight': 'normal', 'display': 'block', 'textDecoration': 'underline' }} to="/">Back to main page</Link>
      </div>
   )
}

export default Page404;