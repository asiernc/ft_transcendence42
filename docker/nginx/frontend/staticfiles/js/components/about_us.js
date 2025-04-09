import { navigateTo } from '../app.js';

export default class AboutUsComponent extends HTMLElement {
	constructor() {
		super();

		const style = document.createElement('style');
        style.textContent = `
            .bg {
                height: fit-content;
                width: 100vw;
                margin: 0;
                overflow-x: hidden;
            }

            @keyframes gradient {
                0% {
                    background-position: 0% 50%;
                }
                50% {
                background-position: 100% 50%;
                }
                100% {
                    background-position: 0% 50%;
                }
            }

            #team-container {
                height: fit-content;
                width: 100vw;
                overflow-x: hidden;
                background: linear-gradient(-45deg, #31353C, #000000, #31353C, #000000);
                background-size: 400% 400%;
                animation: gradient 10s ease infinite;
            }

            .pixel-font {
                color: inherit;
                text-decoration: none;
                font-family: "Press Start 2P";
            }


            header{
                position: relative;
                .container-text {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    width: 100vw;
                    text-align: center;

                    margin: 0 auto;
                    padding: 1rem 2rem;
                }
                .showcase{
                    height: 400px;
                    display: flex;
                    flex-direction: column;
                    padding-top: 10vh;
                    justify-content: flex-start;
                    align-items: flex-start;
                    width: 100%;
                    h1{
                        color: #fff;
                        font-size: 2.5rem;
                        margin-bottom: 0;
                        font-weight: 700;
                        margin-bottom: 1rem;
                    }
                    p{
                        margin-top: 0;
                        color: #fff;
                        font-weight: 500;
                        line-height: 1.4;
                        font-size: 0.9rem;
                        width: 30rem;
                    }
                }
                .video-container{
                    z-index: -1;
                    position: absolute;
                    top: 0;
                    left: 0;
                    height: 100%;
                    width: 100vw;
                    video{
                        height: 100%;
                        width: 100%;
                        object-fit: cover;
                    }
                    &::after{
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        height: 100%;
                        width: 100%;
                        background-color: rgba(0,0,0,0.82);
                    }
                }
            }

            .our-team{
                border-left: 8px solid #3b336a;
                border-bottom: 8px solid #3b336a;
                background-color: #D9D9D9;
            }
            .red-c{
                border-left: 8px solid  red;
                border-bottom: 8px solid  red;
            }
            .blue-c{
                border-left: 8px solid  blue;
                border-bottom: 8px solid  blue;
            }
            .green-c{
                border-left: 8px solid  #00FF00;
                border-bottom: 8px solid  #00FF00;
            }
            .pink-c{
                border-left: 8px solid  #FF00FF;
                border-bottom: 8px solid  #FF00FF;
            }
            .orange-c{
                border-left: 8px solid  orange;
                border-bottom: 8px solid  orange;
            }
            .our-team .team-image{
                position: relative;
                text-align: center;
            }
            .our-team img{
                width: 100%;
                height: auto;
            }
            .our-team .description{
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
                font-size: 10px;
                color: white;
                line-height: 30px;
                padding: 40px 50px;
                opacity: 0;
                transition: all 0.5s ease 0s;
            }
            .red-c .description{
                background: #ff0000a9;
            }
            .blue-c .description{
                background: #0000FFa6;
            }
            .green-c .description{
                background: #00FF00a6;
            }
            .pink-c .description{
                background: #ff00ffa6;
            }
            .orange-c .description{
                background: #ffa600a6
            }
            .our-team:hover .description{
                opacity: 1;
            }
            .our-team .social{
                padding: 10px 0 0 0;
                margin: 0;
                list-style: none;
                position: absolute;
                top: 40px;
                left: -27px;
                background: #3b336a;
                text-align: center;
                transform: translate(25px, 0px) rotateY(90deg);
                transition: all 0.5s ease 0s;
            }
            .red-c .social{
                background: #FF0000;
            }
            .blue-c .social{
                background: #0000FF;
            }
            .green-c .social{
                background: #00FF00;
            }
            .pink-c .social{
                background: #FF00FF;
            }
            .orange-c .social{
                background: orange;
            }
            .our-team:hover .social{
                transform: translate(0px, 0px) rotateY(0deg);
            }
            .our-team .social li{
                display: block;
                margin-bottom: 10px;
            }
            .our-team .social li a{
                display: block;
                width: 40px;
                height: 35px;
                font-size: 13px;
                color: white;
                line-height: 30px;
                transition: all 0.5s ease 0s;
            }
            .our-team .social li a:hover{
                background: #bc3fbf;
            }
            .red-c .social li a:hover{
                background: #ff4a4a;
            }
            .blue-c  .social li a:hover{
                background: #4949ff;
            }
            .green-c  .social li a:hover{
                background: #44ff44;
            }
            .pink-c  .social li a:hover{
                background: #ff48ff;
            }
            .orange-c  .social li a:hover{
                background: rgb(255, 191, 72);
            }
            .our-team .team-info{
                padding: 20px;
            }
            .our-team .title{
                font-size: 15px;
                color: #3b336a;
                margin: 0 0 15px 0;
                transition: all 0.5s ease 0s;
            }
            .red-c .title{
                color: #FF0000;
            }
            .blue-c .title{
                color: #0000FF;
            }
            .green-c .title{
                color:#007400;
            }
            .pink-c .title{
                color: #FF00FF;
            }
            .orange-c .title{
                color: orange;
            }
            .our-team .post{
                display: block;
                font-size: 10px;
                color: black;
                text-transform: capitalize;
            }
            .our-team .title:hover,
            .our-team .post:hover{
                color: rgb(99, 99, 99);
            }
            .red-c .title:hover{
                color: #ff4a4a;
            }
            .blue-c .title:hover{
                color: #4949ff;
            }
            .green-c .title:hover{
                color: #007400;
            }
            .pink-c .title:hover{
                color: #ff48ff;
            }
            .orange-c .title:hover{
                color: rgb(255, 191, 72);
            }
        `;

		const div = document.createElement('div');
		div.innerHTML = `
            <header class="pixel-font" style="text-align: center;">
                <div class="showcase">
                    <div class="container-text">
                        <h1>ABOUT US</h1>
                        <p>Meet the team</p>
                        <p>
                            We are the team from 42Barcelona who developed this ft_transcendence, a full-stack web application as part of our learning journey.
                        </p>
                    </div>
                </div>
                <div class="video-container">
                    <video src="./staticfiles/js/utils/images/42_Barcelona.mp4" autoplay loop muted></video>
                </div>
            </header>
            <div  id="team-container">
                <div class="container pixel-font">
                    <div class="row mt-5">
                        <div class="col-md-4 col-sm-6">
                            <div class="our-team red-c">
                                <div class="team-image">
                                    <img src="./staticfiles/js/utils/images/team_members/alcaball.png">
                                    <p class="description">
                                        Always developing random things.
                                    </p>
                                    <ul class="social">
                                        <li><a href="https://github.com/albertcaballero" target="_blank"><i class="fa-brands fa-github"></i></a></li>
                                        <li><a href="https://www.linkedin.com/in/albert-caballero-coll/" target="_blank"><i class="fa-brands fa-linkedin"></i></a></li>
                                    </ul>
                                </div>
                                <div class="team-info">
                                    <h3 class="title">Albert Caballero</h3>
                                    <span class="post">web developer</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="col-md-4 col-sm-6">
                            <div class="our-team blue-c">
                                <div class="team-image">
                                    <img src="./staticfiles/js/utils/images/team_members/anovio-c.png">
                                    <p class="description">
                                        Charizard está tan on fire que Dumbledore lo fichó para reemplazar a Fawkes.
                                    </p>
                                    <ul class="social">
                                        <li><a href="https://github.com/asiernc" target="_blank"><i class="fa-brands fa-github"></i></a></li>
                                        <li><a href="https://www.linkedin.com/in/asierncara/" target="_blank"><i class="fa-brands fa-linkedin"></i></a></li>
                                    </ul>
                                </div>
                                <div class="team-info">
                                    <h3 class="title">Asier Novio</h3>
                                    <span class="post">Backend Developer and devOps</span>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-4 col-sm-6">
                            <div class="our-team green-c">
                                <div class="team-image">
                                    <img src="./staticfiles/js/utils/images/team_members/molasz-a.png">
                                    <p class="description">
                                        Code, break, fix.
                                    </p>
                                    <ul class="social">
                                        <li><a href="https://github.com/Molasz" target="_blank"><i class="fa-brands fa-github"></i></a></li>
                                        <li><a href="https://es.linkedin.com/in/martiolasz" target="_blank"><i class="fa-brands fa-linkedin"></i></a></li>
                                    </ul>
                                </div>
                                <div class="team-info">
                                    <h3 class="title">Martí Olasz</h3>
                                    <span class="post">Full Stack developer</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row mt-5 mb-5">
                        <div class="col-md-2 col-sm-6"></div>
                        <div class="col-md-4 col-sm-6">
                            <div class="our-team pink-c">
                                <div class="team-image">
                                    <img src="./staticfiles/js/utils/images/team_members/rcortes-.jpg" style="height: 348px; width: 348px">
                                    <p class="description">
                                        Yes.
                                    </p>
                                    <ul class="social">
                                        <li><a href="https://github.com/rcortes-b/" target="_blank"><i class="fa-brands fa-github"></i></a></li>
                                        <li><a href="https://www.linkedin.com/in/ra%C3%BAl-cort%C3%A9s-ben%C3%ADtez-138999317/" target="_blank"><i class="fa-brands fa-linkedin"></i></a></li>
                                    </ul>
                                </div>
                                <div class="team-info">
                                    <h3 class="title">Raúl Cortés</h3>
                                    <span class="post">web developer</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 col-sm-6">
                            <div class="our-team orange-c">
                                <div class="team-image">
                                    <img src="./staticfiles/js/utils/images/team_members/mvallhon.png">
                                    <p class="description">
                                        In constant learning.
                                    </p>
                                    <ul class="social">
                                        <li><a href="https://github.com/MartiVallhonrat" target="_blank"><i class="fa-brands fa-github"></i></a></li>
                                        <li><a href="https://www.linkedin.com/in/martí-vallhonrat-rafart" target="_blank"><i class="fa-brands fa-linkedin"></i></a></li>
                                    </ul>
                                </div>
                                <div class="team-info">
                                    <h3 class="title">Martí Vallhonrat</h3>
                                    <span class="post">Developer</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-2 col-sm-6"></div>
                    </div>
                </div>
            </div>
		`;

		this.appendChild(style);
        div.className = 'bg';
		this.appendChild(div);
	}

	disconnectedCallback() {
        this.querySelector("a").removeEventListener('click', this);
	}
}

window.customElements.define('about_us-component', AboutUsComponent);