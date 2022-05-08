import AppHeader from "../appHeader/AppHeader";
import {lazy, Suspense} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Spinner from "../spinner/Spinner";


const Page404 = lazy(() => import('../pages/404'));
const MainPage = lazy(() => import('../pages/MainPage'));
const SingleComic = lazy(() => import('../pages/SingleComic'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));

const App = () => {



    return (
        <div className="app">
            <Router>
            <AppHeader/>
            <main>
               <Suspense fallback={<Spinner />}>
                   <Routes>
                       <Route path='/' element={<MainPage />}/>
                       <Route path='/comics' element={<ComicsPage />} />
                       <Route path='/comics/:id' element={<SingleComic />} />
                       <Route path='*' element={<Page404 />} />
                   </Routes>
               </Suspense>
              {/* <SingleComic />*/}
            </main>
            </Router>
        </div>
    )

}

export default App;

















