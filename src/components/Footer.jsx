import { FaFilm, FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter, FaInstagram } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";

function Footer() {
    return (
        <footer className=" p-5 text-white text-center">
            <div className="row pb-3">
                <div className="col-12 col-md-4">
                    <div className="row pb-3">
                        <h5 className="p-2">Film</h5>
                        <div> <a className="link-footer" href="#">Ultimi film</a></div>
                        <div><a className="link-footer" href="#">Studio tour</a></div>
                        <div><a className="link-footer" href="#">Coming soon</a></div>
                    </div>
                </div>

                <div className="col-12 col-md-4">
                    <div className="row pb-3">
                        <h5 className="p-2">About</h5>
                        <div> <a className="link-footer" href="#">Lorem ipsum dolor sit amet. Turel upn gravida nibh vel velit auctor aliquet aen sollic conseut ipsutis.</a> <FaFilm style={{ color: "white", fontSize: "26px" }} /></div>
                    </div>
                </div>

                <div className="col-12 col-md-4">
                    <div className="row pb-3 deb">
                        <h5 className="p-2">Contatti</h5>
                        <div className="col-12 col-md-6 col-lg-3"><a className="link-footer" href="#"><FaFacebook /> Facebook</a></div>
                        <div className="col-12 col-md-6 col-lg-3"><a className="link-footer" href="#"><FaSquareXTwitter /> Twitter X</a></div>
                        <div className="col-12 col-md-6 col-lg-3"><a className="link-footer" href="#"><FaInstagram /> Instagram</a></div>
                        <div className="col-12 col-md-6 col-lg-3 pb-2"><a className="link-footer" href="#"><FaYoutube /> YouTube</a></div>
                        <div className="col-12"><a href="mailto:indirizzo@email.com" className="link-footer"><strong>Oppure scrivici:</strong> indirizzo@email.com</a></div>
                    </div>
                </div>

            </div>


            Made with &hearts; by Danilo
        </footer>
    );
};

export default Footer;
