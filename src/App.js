import React from 'react';
import './App.css';
import Login from './modules/login/login.component';
import Register from './modules/register/register.component';
import Dashboard from './modules/dashboard/dashboard.component';
import Header from './shared/header/header.component';
import BottomNav from './shared/bottom-navigation/bottom-navigation.component';
import { ProductListScreen } from './modules/product/product_list/product_list.component';
import { EditScreen } from './modules/product/edit_product/edit_product.component.'
import { Route, Switch, withRouter } from 'react-router-dom';
import StoreRegister from './modules/register/store/store_register.component';
import CreateProduct from './modules/baseProduct/createProduct.component';
import { OrderScreen } from './modules/orders/order_list/order_screen.component';
import { OrderDetails } from './modules/orders/order_details/order_details.component';
import { OrderEditScreen } from "./modules/orders/edit_order/order_edit.component";
import { BusinessSetupScreen } from './modules/store/businees_setup/businees_setup.component';
import { MyaccountScreen } from './modules/store/account/my_account.component';
import { UserManageScreen } from './modules/store/user_manage/user_manage.component';
import Storedesign from './modules/storeDesign/store_design.component'
import { AuthContext } from './modules/utils/auth-context';
import  { StateProvider } from './modules/utils/App-state-provider';
import Loader from './components/loader/loader.component';
import { usePromiseTracker } from "react-promise-tracker";
import {LocalProvider} from './locale'
function showHeader(route) {
  const noAuth = ['', 'login', 'register'];
  const has = noAuth.filter(auth => {
    return route === `/${auth}`;
  });
  return (has && has.length) ? false : true;
}

function App(e) {
  const { promiseInProgress } = usePromiseTracker();
  return (
    <main>
      <StateProvider>
        <LocalProvider locale={'en'}>
        <Header />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/" component={Dashboard} exact />
          <Route path="/productlist" component={ProductListScreen} />
          <Route path="/orderDetails" component={OrderDetails} />
          <Route path="/orderlist" component={OrderScreen} />
          <Route path="/editScreen" component={EditScreen} />
          <Route path="/storeRegister" component={StoreRegister} />
          <Route path="/createProduct" component={CreateProduct} />
          <Route path="/orderEdit" component={OrderEditScreen} />
          <Route path="/businessSetup" component={BusinessSetupScreen} />
          <Route path="/myAccount" component={MyaccountScreen} />
          <Route path="/userManage" component={UserManageScreen} />
          <Route path="/storeDesign" component={Storedesign} />
        </Switch>
        <BottomNav />
        {promiseInProgress ? <Loader /> : null}
        </LocalProvider>
      </StateProvider>
    </main>
  )
}


export default withRouter(App);
