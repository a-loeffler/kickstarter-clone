import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Carousel from "../LandingPage/Carousel";
import ProjectCard from "../LandingPage/ProjectCard";
import './ProfilePage.css'
import RedirectModal from "../RedirectModal";

export default function ProfilePage() {
    const {id} = useParams();
    const allProjects = useSelector(state => state.allProjects.projects)
    const projectMedia = useSelector(state => state.MediaList.project_medias)
    const userProjects = allProjects?.filter(obj => obj.owner_id == Number(id));
    const Users = useSelector(state => state.allUsers.users)
    const user = useSelector(state => state.session.user)
    const selectedUser = Users?.filter(user => user.id === Number(id))[0]


    const limitText = (str) => str.length > 70 ? `${str.substring(0, 70)}...` : str;
    let width = "300px"
    let minHeight = "300px"
    let display = "flex"

    useEffect(() => {}, [Users])

    if (Users?.length && !selectedUser) {
        return (
            <>
                <RedirectModal destination={'/'} message={'Requested profile page does not exist.'}/>
            </>
        )
    }

    return(
        <div className="container">
            <h3 className="myProjects">{`${selectedUser?.username}'s Projects:`}</h3>
            <div className="users_projects">

                {userProjects.length > 0 ?
                <>

                {userProjects.map(project => {
                    return(
                        <ProjectCard key={project.id} width={width} minHeight={minHeight} display={display} title={project?.name} description={limitText(project?.description)} cardId={project?.id} image={projectMedia?.filter(item => item.project_id === project.id)[0]} />
                    )
                })}
                </>

             : <div className="noProjects">{`${selectedUser?.username}`} currently has no projects. Shame on you {`${selectedUser?.username}`}!</div>

            }

            </div>

        </div>
    )
}
