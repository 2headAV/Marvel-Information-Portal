import { Outlet, useOutlet } from "react-router-dom";

import ComicsList from "../comicsList/ComicsList";
import AppBanner from "../appBanner/AppBanner";

const ComicsPage = () => {

   const outLet = useOutlet();
   return (
      <>
         {outLet ? <><AppBanner /><Outlet /></> : <ComicsList />}
      </>
   )
}

export default ComicsPage;
