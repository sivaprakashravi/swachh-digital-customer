import React from 'react';
import './product_list.style.scss';
import { VMenu } from '../../../components/menu/menu.component';
import { BiRupee } from 'react-icons/bi';
import { BsImages } from 'react-icons/bs';
export const Listview = (props) => {
  const { data, edit } = props;
  const menu = (data) => {
    return (<VMenu data={data} >
      <li onClick={() => props.nav.push({ pathname: 'editScreen', state: data, callBack: edit, type: 'edit' })}>Edit</li>
      <li onClick={() => props.delete(data.DocId)}>Delete</li>
      <li onClick={() => props.nav.push({ pathname: 'editScreen', state: data, callBack: edit, type: 'move' })}>Move</li>
      <li onClick={() => props.nav.push({ pathname: 'editScreen', state: data, callBack: edit, type: 'copy' })}>Copy</li>
      <li onClick={() => props.nav.push({ pathname: 'editScreen', state: data, callBack: edit, type: 'subcategory' })}>Add subcategory</li>
    </VMenu>)
  }
  const tile = (data) => {
    return (
      <div className="tile">
        {data.Imageurl ? <div className="image-box" style={{ backgroundImage: `url(${data.Imageurl})` }}></div> : <div className="image-box"><BsImages size="25px" className="placeholder" /></div>}
        <div className="elements">
          <div>Name: {data.ProductName}</div>
          <div className="options">{menu(data)}</div>
          <div>Category: {data.Category}</div>
          <div >Price: <BiRupee size="1.1rem" style={{ verticalAlign: 'bottom' }} />{data.RetailPrice}</div>
        </div>
      </div>
    )
  }
  return (
    <div className="product">{tile(data)}</div>
  )
}