import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

import './index.css'

import ProjectCard from './ProjectCard'

const Carousel = ({list, id, title}) => {

    const [slidePosition, setSlidePosition] = useState(0);

    const [slidesToDisplay, setSlidesToDisplay] = useState([]);

    const project_medias = useSelector((state) => state.MediaList.project_medias)

    console.log("WTFWTFWTFWTFWTFWTFWTFWTFWTFWTFW", list[0]?.owner_id)
    useEffect(() => {
        let displaySlides = list.slice(slidePosition, slidePosition + 5);

        setSlidesToDisplay(displaySlides);

    }, [slidePosition, list, project_medias])


    const leftClick = () => {
        if (slidePosition > 0) {
            setSlidePosition(slidePosition - 1);
        }
    }


    const rightClick = () => {
        if (slidePosition < list.length - 4) {
            setSlidePosition(slidePosition + 1);
        }

        //To Do: if the user reaches the last track, direct them to more search results
        // else {}
    }

    //#region
    // const totalLength = list.length - 1;
    // const [scrollIndex, setScrollIndex] = useState(0)
    // const [scrollId, setScrollId] = useState(`${id}-${scrollIndex}`)

    // const [scrollerWidth, setScrollerWidth] = useState(0);
    // const [scrollElement, setScrollElement] = useState(null);
    // const [scrollToPosition, setScrollToPosition] = useState(0);

    // useEffect(() => {
    //     setScrollElement(document.getElementById(scrollId));
    //     if (scrollElement) {
    //         setScrollerWidth(scrollElement.scrollWidth)
    //         console.log(scrollElement.scrollWidth)
    //     }
    //     console.log("element width:  ", scrollerWidth)

    // }, [])

    // const rightClick = () => {
    //     if (scrollIndex < totalLength) {
    //         setScrollIndex(scrollIndex + 1);
    //         setScrollId(`${id}-${scrollIndex}`)

    //         console.log("scroll Id", scrollId)
    //         setScrollElement(document.getElementById(scrollId))

    //         if (scrollElement) {
    //             scrollElement.scrollIntoView({
    //                 behavior: "smooth",
    //                 block: "start",
    //                 inline: "start"
    //             })
    //         }
    //     }

    // }

    // const rightClick = () => {
    //     if (scrollElement) {
    //         if (scrollToPosition < 1500) {
    //             let oldPosition = scrollToPosition;
    //             setScrollToPosition(oldPosition + 250)
    //             scrollElement.scroll(scrollToPosition, 0)
    //             console.log(scrollToPosition)

    //         }
    //     }
    // }

    // const leftClick = () => {
    //     if (scrollElement) {
    //         if (scrollToPosition >= 0) {
    //             let oldPosition = scrollToPosition;
    //             setScrollToPosition(oldPosition - 250)
    //             scrollElement.scroll(scrollToPosition, 0)
    //             console.log(scrollToPosition)

    //         }
    //     }
    // }
    //#endregion
    const limitText = (str) => str.length > 70 ? `${str.substring(0, 70)}...` : str;
    let width = "95%"
    let minHeight = "240px"
    let display = "flex"


    return (
        <div className="carousel-container">
            <div className="carousel-title-info">
                <h2 className="carousel-title">{title}</h2>
                <a className="carousel-title-link" href="">
                    <p>Link</p>
                    <img className="carousel-title-link-arrow" src="images/right-button.svg" alt=""></img>
                </a>
            </div>
            <div className="carousel-buttons-container">
                <div className="carousel-button-border right-space">
                    <img className="carousel-button" src="images/left-button.svg" alt="" onClick={leftClick}></img>
                </div>
                <div className="carousel-button-border">
                    <img className="carousel-button" src="images/right-button.svg" alt="" onClick={rightClick}></img>
                </div>
            </div>
            <div className="carousel-items-container" id={id}>
                {console.log('slidesTod siplay ', slidesToDisplay)}
                {slidesToDisplay.map((project, index) =>  {
                    const project_medias2 = project_medias?.filter(obj => obj['project_id'] === project.id);
                    return <ProjectCard key={index} width={width} minHeight={minHeight} display={display} title={project.name} description={limitText(project.description)} cardId={`${project.id}`} image={project_medias2[0]} ownerId={project.owner_id}/>
            })}
            </div>
        </div>
    )
}

export default Carousel;
