import Navbar from "./Navbar";
import  styles from "../ComponentStyles/Subscriber.css";

function Subscriber() {
    return (
        <div>
            <Navbar/>
            <div className ="subscriber">
                <div class="number">4.8(41 Reviews)</div>
                <div class="star">
                    <img src="./images/star-images.jpeg"/>
                </div>
                <div class="images">
                        <img src="./images/img.jpeg"/>
                </div>
                <div class="profile">
                    <button class="text-orange-500 hover:text-black">Edit Profile</button>
                </div>
                <div class="text">Sharma Mess</div>
                <div class="text1">Total Subscription:</div>
                <div class="txt2">
                    <button class="text-orange-500 hover:text-black">Subscribers:</button>
                </div>
                <div class="txt3">
                    <button class="text-orange-500 hover:text-black">View All</button>
                </div>
                <div class="card">
                    <div class="box">
                        <img src="../images/img1.jpeg"/>
                            <p>Deepti</p>
                            <p>Mobile no.</p>
                    </div>
                    <div class="box">
                        <img src="../images/img1.jpeg"/>
                            <p>Deepti</p>
                            <p>Mobile no.</p>
                    </div>
                    <div class="box">
                        <img src="../images/img1.jpeg"/>
                            <p>Deepti</p>
                            <p>Mobile no.</p>
                    </div>
                    <div class="box">
                    <img src="../images/img1.jpeg"/>
                            <p>Deepti</p>
                            <p>Mobile no.</p>
                    </div>
                    </div>
                <div class="menu"> Mess Menu</div>
                <div class="txt5">
                    <p>Dal(1 serve)</p>
                    <p>Rice(1 serve)</p>
                    <p>Chapati(6)</p>
                    <p>Curd(1 serve)</p>
                    <p>Rasgulla(1 piece)</p>
                </div>
                <div class="txt6">
                    <button class="text-orange-500 hover:text-black">Add New Item</button>
                </div>
                <div class="txt7">
                    <button class="text-orange-500 hover:text-black">Remove Item</button>
                </div>
            </div>
        </div>
    );
}

export default Subscriber;
