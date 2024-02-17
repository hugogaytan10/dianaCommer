import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from '../Home/Home';
import { Item } from '../Item/Item';
import { Cart } from '../Cart/Cart';
import { Profile } from '../Profile/Profile';
export const Rutas = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/item' element={<Item/>}/>
                    <Route path='/cart' element={<Cart/>}/>
                    <Route path='/profile' element={<Profile/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}