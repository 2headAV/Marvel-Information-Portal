import { Outlet, useOutlet } from "react-router-dom";

import ComicsList from "../comicsList/ComicsList";
import AppBanner from "../appBanner/AppBanner";

const ComicsPage: React.FC = () => {

   const outLet = useOutlet();
   return (
      <>
         {outLet ? <><AppBanner /><Outlet /></> : <ComicsList />}
      </>
   )
}

export default ComicsPage;
