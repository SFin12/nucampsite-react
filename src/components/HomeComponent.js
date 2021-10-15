import React from "react";
import Card from "reactstrap/lib/Card";
import CardBody from "reactstrap/lib/CardBody";
import CardImg from "reactstrap/lib/CardImg";
import CardText from "reactstrap/lib/CardText";
import CardTitle from "reactstrap/lib/CardTitle";

function RenderCard({item}) {
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
    return (
        <div className="container">
            <div className="row">
                <div className="col-md m-1">
                    <RenderCard item={props.campsite} />
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