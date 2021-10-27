import React from "react";
import Card from "reactstrap/lib/Card";
import CardBody from "reactstrap/lib/CardBody";
import CardImg from "reactstrap/lib/CardImg";
import CardText from "reactstrap/lib/CardText";
import CardTitle from "reactstrap/lib/CardTitle";
import { Loading } from './LoadingComponent';

function RenderCard({item, isLoading, errMess}) {
    if(isLoading) {
        return <Loading />;
    }
    if(errMess) {
        return <h4>{errMess}</h4>;
    }
    
    return (
        <Card>
            <CardImg src={item.image} alt={item.name} />
            <CardBody>
                <CardTitle>
                    {item.name}
                </CardTitle>
                <CardText>{item.description}</CardText>
            </CardBody>
        </Card>
    )
}


function Home(props){
    console.log(props.campsite)
    return (
        <div className="container">
            <div className="row">
                <div className="col-md m-1">
                    <RenderCard 
                        item={props.campsite} 
                        isLoading={props.campsitesLoading}
                        errMess={props.campsitesErrMess}
                        />
                </div>
                <div className="col-md m-1">
                    <RenderCard item={props.promotion} />
                </div>
                <div className="col-md m-1">
                    <RenderCard item={props.partner} />
                </div>
            </div>
        </div>
    )
}

export default Home;