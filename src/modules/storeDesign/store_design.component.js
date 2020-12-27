import React from 'react';
import './store_design.style.scss';
import {MdPhonelinkSetup,MdColorLens} from 'react-icons/md'
class Storedesign extends React.Component{
    constructor(props){
        super(props);
        this.state={
            services:[{
                label: 'Page',
                route: '',
                icon: <MdPhonelinkSetup size="35px" />
            },
            {
                label: 'Theme',
                route: '',
                icon: <MdColorLens size="35px" />
            }]
        }
    };

    renderServices(){
        return(
            <ul>
      {  this.state.services.map((x,index)=>{
            return(
                <li className="item-view">
                   {x.icon}
                   <label>{x.label}</label>
                </li>
            )
        })}
        </ul>
        )
    }

    render(){
        return(
            <div className="store-design">
               {this.renderServices()}
            </div>
        )
    }
};

export default Storedesign;