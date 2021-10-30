import React, { Component } from "react";
import {
    Card,
    CardImg,
    CardImgOverlay,
    CardText,
    CardBody,
    CardTitle,
    Breadcrumb,
    BreadcrumbItem,
    Label,
} from "reactstrap";
import { Link } from "react-router-dom";
import Button from "reactstrap/lib/Button";
import { Modal } from "reactstrap";
import { Control, LocalForm, Errors } from "react-redux-form";
import ModalHeader from "reactstrap/lib/ModalHeader";
import { Loading } from "./LoadingComponent";
import { baseUrl } from '../shared/baseUrl';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;
class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
        };
    }

    toggleModal = () => {
        this.setState({ isModalOpen: !this.state.isModalOpen });
    };

    handleSubmit = (values) => {
        this.toggleModal();
        this.props.postComment(
            this.props.campsiteId,
            values.rating,
            values.author,
            values.text
        );
    };

    render() {
        return (
            <React.Fragment>
                <Modal
                    isOpen={this.state.isModalOpen}
                    toggle={this.toggleModal}
                >
                    <ModalHeader>Submit Comment</ModalHeader>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                        <div className="form-group m-2">
                            <Label htmlFor="rating">Rating</Label>
                            <Control.select
                                model=".rating"
                                id="rating"
                                name="rating"
                                className="form-control"
                            >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </Control.select>
                        </div>
                        <div className="form-group m-2">
                            <Label htmlFor="author">Author</Label>
                            <Control.text
                                model=".author"
                                id="author"
                                name="author"
                                className="form-control"
                                validators={{
                                    required,
                                    minLength: minLength(2),
                                    maxLength: maxLength(15),
                                }}
                            />
                            <Errors
                                className="text-danger"
                                model=".author"
                                show="touched"
                                component="div"
                                messages={{
                                    required: "Required",
                                    minLength: "Must be at least 2 characters",
                                    maxLength: "Must be 15 characters or less",
                                }}
                            />
                        </div>
                        <div className="form-group m-2">
                            <Label htmlFor="text">Text</Label>
                            <Control.textarea
                                rows="6"
                                model=".text"
                                id="text"
                                name="text"
                                className="form-control"
                            >
                                Text
                            </Control.textarea>
                        </div>
                        <Button
                            type="submit"
                            className="btn btn-primary bg-primary m-2"
                        >
                            Submit
                        </Button>
                    </LocalForm>
                </Modal>
                <Button outline onClick={this.toggleModal}>
                    <i className="fa fa-pencil fa-large"></i> Submit Comment
                </Button>
            </React.Fragment>
        );
    }
}

function RenderCampsite({ campsite }) {
    return (
        <div className="col-md-5 m-1">
            <Card>
                <CardImg top src={baseUrl + campsite.image} alt={campsite.name} />
                <CardBody>
                    <CardText>{campsite.description}</CardText>
                </CardBody>
            </Card>
        </div>
    );
}

function RenderComments({ comments, postComment, campsiteId }) {
    if (comments) {
        return (
            <div className="col-md-5 m-1">
                <h4>"comments"</h4>
                {comments.map((comment) => {
                    return (
                        <div key={comments.id}>
                            <div>{comment.text}</div>
                            <p>
                                --{comment.author},{" "}
                                {new Intl.DateTimeFormat("en-US", {
                                    year: "numeric",
                                    month: "short",
                                    day: "2-digit",
                                }).format(new Date(Date.parse(comment.date)))}
                            </p>
                        </div>
                    );
                })}
                <CommentForm campsiteId={campsiteId} postComment={postComment} />
            </div>
        );
    }
    return <div></div>;
}

function CampsiteInfo(props) {
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            </div>
        );
    }
    if (props.campsite) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem>
                                <Link to="/directory">Directory</Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem active>
                                {props.campsite.name}
                            </BreadcrumbItem>
                        </Breadcrumb>
                        <h2>{props.campsite.name}</h2>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderCampsite campsite={props.campsite} />
                    <RenderComments
                        comments={props.comments}
                        postComment={props.postComment}
                        campsiteId={props.campsite.id}
                    />
                </div>
            </div>
        );
    } else {
        return <div></div>;
    }
}

export default CampsiteInfo;
