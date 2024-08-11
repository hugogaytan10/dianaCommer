import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  useLocation,
} from "react-router-dom";
import { Home } from "../Home/Home";
import { Item } from "../Item/Item";
import { Cart } from "../Cart/Cart";
import { Profile } from "../Profile/Profile";
import menu from "../assets/menu.svg";
import carrito from "../assets/cart-outline.svg";
import usuario from "../assets/userIcon.svg";
import { useContext, useEffect } from "react";
import { AppContext } from "../Context/AppContext";
import { Ubication } from "../Ubication/Ubication";
import { InicioAdmin } from "../Admin/InicioAdmin";
import { Categoria } from "../Admin/Categorias/Categoria";
import { Footer } from "../Footer/Footer";
import { Politica } from "../Politica/Politica";
import { MainStripe } from "../Stripe/MainStripe";
import { PagoCompletado } from "../Stripe/PagoCompletado";
import { ElegirMetodoPago } from "../MetodoPago/ElegirMetodoPago";
import { Intro } from "../Blog/CalzadoDiazIntro/Intro";
import { Reportes } from "../Admin/Reportes";
import { ProtectedRoute } from "./RutasProtegidas";
import { AuthPage } from "../Login/AuthPage";
import { Caliz } from "../caliz/Caliz";
import { ListaDeseos } from "../ListaDeseos/ListaDeseos";

export const Rutas = () => {
  const contexto = useContext(AppContext);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("items")) || [];
    contexto.setCart(cart.length);
  }, [contexto]);

  return (
    <div>
      <BrowserRouter>
        <div className="drawer overflow-hidden">

          <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col h-full min-w-full">
            <HeaderWrapper>
              <div className="w-full navbar bg-primary">
                <div className="flex-none lg:hidden">
                  <label
                    htmlFor="my-drawer-3"
                    aria-label="open sidebar"
                    className="btn btn-square btn-ghost"
                  >
                    <img
                      src={menu}
                      alt="menu"
                      className="h-10 w-10"
                    />
                  </label>
                </div>
                <div className="flex-1 px-2 mx-2 text-gray-50 font-bold justify-center md:justify-start">
                  <NavLink to="/">DIAZ ZAPATOS Y ACCESORIOS</NavLink>
                </div>
                <div className="contenedor-carrito">
                  <span className="mt-1">{contexto.cart}</span>
                  <NavLink to="/cart">
                    <img src={carrito} alt="carrito" />
                  </NavLink>
                </div>
                <div className="contenedor-carrito">
                  <NavLink to="/login">
                    <img src={usuario} alt="usuario" className="w-8 h-8"/>
                  </NavLink>
                </div>
                <div className="flex-none hidden lg:block">
                  <ul className="menu menu-horizontal">
                    <li>
                      <NavLink
                        className={({ isActive }) =>
                          isActive
                            ? "active-link text-lg bg-primary text-white"
                            : "text-white text-lg"
                        }
                        to="/"
                      >
                        Inicio
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className={({ isActive }) =>
                          isActive
                            ? "active-link text-lg bg-primary text-white"
                            : "text-white text-lg"
                        }
                        to="/listaDeseos"
                      >
                        Favoritos
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className={({ isActive }) =>
                          isActive
                            ? "active-link text-lg bg-primary text-white"
                            : "text-white text-lg"
                        }
                        to="/ubication"
                      >
                        Ubicación
                      </NavLink>
                    </li>
                    {
                      contexto.user.TipoUsuario === 0 && (
                        <>
                          <li>
                            <NavLink
                              className={({ isActive }) =>
                                isActive
                                  ? "active-link text-lg bg-primary text-white"
                                  : "text-white text-lg"
                              }
                              to="/admin"
                            >
                              Productos
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              className={({ isActive }) =>
                                isActive
                                  ? "active-link text-lg bg-primary text-white"
                                  : "text-white text-lg"
                              }
                              to="/admin/categorias"
                            >
                              Categorias
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              className={({ isActive }) =>
                                isActive
                                  ? "active-link text-lg bg-primary text-white"
                                  : "text-white text-lg"
                              }
                              to="/admin/Reporte"
                            >
                              Reportes
                            </NavLink>
                          </li>
                        </>
                      )
                    }
                  </ul>
                </div>
              </div>
            </HeaderWrapper>

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<AuthPage />} />
              <Route path="/item/:id" element={<Item />} />
              <Route path="/item" element={<Item />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/ubication" element={<Ubication />} />
              <Route path="/metodoPago" element={<ElegirMetodoPago />} />
              <Route path="/pago" element={<MainStripe />} />
              <Route path="/pagoCompletado" element={<PagoCompletado />} />
              <Route path="/caliz" element={<Caliz />} />
              <Route path="/listaDeseos" element={<ListaDeseos />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <InicioAdmin />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/categorias"
                element={
                  <ProtectedRoute>
                    <Categoria />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/Reporte"
                element={
                  <ProtectedRoute>
                    <Reportes />
                  </ProtectedRoute>
                }
              />
              <Route path="/politica" element={<Politica />} />
              <Route path="/blog" element={<Politica />} />
              <Route path="/blog/intro" element={<Intro />} />
            </Routes>
          </div>

          <HeaderWrapper>
            <div className="drawer-side z-30">
              <label
                htmlFor="my-drawer-3"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <ul className="menu p-4 w-80 min-h-full bg-primary">
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive ? "active-link text-lg" : "text-white text-lg"
                    }
                    onClick={() => {
                      document.getElementById("my-drawer-3").checked = false;
                    }}
                  >
                    Inicio
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/listaDeseos"
                    className={({ isActive }) =>
                      isActive ? "active-link text-lg" : "text-white text-lg"
                    }
                    onClick={() => {
                      document.getElementById("my-drawer-3").checked = false;
                    }}
                  >
                    Favoritos
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "active-link text-lg" : "text-white text-lg"
                    }
                    to="/cart"
                    onClick={() => {
                      document.getElementById("my-drawer-3").checked = false;
                    }}
                  >
                    Carrito
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "active-link text-lg" : "text-white text-lg"
                    }
                    to="/ubication"
                    onClick={() => {
                      document.getElementById("my-drawer-3").checked = false;
                    }}
                  >
                    Ubicación
                  </NavLink>
                </li>
                {
                  contexto.user.TipoUsuario == 0 && (
                    <>
                      <li>
                        <NavLink
                          className={({ isActive }) =>
                            isActive
                              ? "active-link text-lg bg-primary text-white"
                              : "text-white text-lg"
                          }
                          to="/admin"
                          onClick={() => {
                            document.getElementById("my-drawer-3").checked = false;
                          }}
                        >
                          Productos
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className={({ isActive }) =>
                            isActive
                              ? "active-link text-lg bg-primary text-white"
                              : "text-white text-lg"
                          }
                          to="/admin/categorias"
                          onClick={() => {
                            document.getElementById("my-drawer-3").checked = false;
                          }}
                        >
                          Categorias
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className={({ isActive }) =>
                            isActive
                              ? "active-link text-lg bg-primary text-white"
                              : "text-white text-lg"
                          }
                          to="/admin/Reporte"
                          onClick={() => {
                            document.getElementById("my-drawer-3").checked = false;
                          }}
                        >
                          Reportes
                        </NavLink>
                      </li>
                    </>
                  )
                }
              </ul>
            </div>
          </HeaderWrapper>
        </div>
        <FooterWrapper />
      </BrowserRouter>
    </div>
  );
};

const FooterWrapper = () => {
  const location = useLocation();
  const noFooterRoutes = [
    "/cart",
    "/metodoPago",
    "/pagoCompletado",
    "/admin",
    "/admin/Reporte",
    "/admin/categorias",
    "/login",
  ];

  if (noFooterRoutes.includes(location.pathname)) return null;
  return <Footer />;
};
const HeaderWrapper = ({ children }) => {
  const location = useLocation();
  const noHeaderRoutes = ["/login"];

  if (noHeaderRoutes.includes(location.pathname)) return null;
  return <>{children}</>;
};