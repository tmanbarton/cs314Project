import React from 'react';
import { Row, Col, Modal, ModalBody, ModalHeader} from 'reactstrap';
import { FaCheck, FaWindowClose } from "react-icons/fa";

const supportedFeatures = ["config", "find"];

export default function ServerSettings(props) {
    


    return (
        <Modal isOpen={props.isOpen} toggle={props.toggleOpen}>
            <Header toggleOpen={props.toggleOpen} />
            <Body
                features={props.features}
            />
        </Modal>
    );
}

function evaluateSupport(newFeatures, supportedFeature){
    return newFeatures.indexOf(supportedFeature) > -1;
}

function Header(props) {
    return (
        <ModalHeader className="ml-2" toggle={props.toggleOpen}>
            Features Checklist
        </ModalHeader>
    );
}

function Body(props) {

    return (
        
        <ModalBody>
                {supportedFeatures.map((feature, index)=>(
                    <Row className="centered" key={`${index} - ${feature}`}>
                        <Col>
                            <h2>{feature}</h2> 
                        </Col>
                        <Col>
                            {evaluateSupport(props.features, feature) ? <FaCheck size={32}/> : <FaWindowClose size={32}/>}
                        </Col>
                        <hr />
                    </Row>
                ))}

        </ModalBody>
    );
}


