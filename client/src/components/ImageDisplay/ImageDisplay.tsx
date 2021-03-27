import React from 'react'
import "./ImageDisplay.css"
import { Container } from "react-bootstrap"
import Card from '../Card/Card'


function ImageDisplay() {
    return (
        <div className="ImageDisplay">
            <Container className="ImageDisplay">
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
            </Container>
        </div>
    )
}

export default ImageDisplay

