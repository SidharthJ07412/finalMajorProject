import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { Container, Radio, Rating } from "./temp.js";
import axios from "axios";

const Ratings = (props) => {

	const {User_id, mess_id} = props;
	const [rate, setRate] = useState(0);

	const give_rating = async (givenRating) => {

          await axios
            .post("https://healthymealz22-04-24f.onrender.com/Customer/Rate_Mess/",
            {
              "User_id": User_id,
			  "Mess_id": mess_id,
			  "Rating": givenRating
            }).then((res) => {
              alert(res.data);
            });
        };

	
	return (
		<Container>
			{[...Array(5)].map((item, index) => {
				const givenRating = index + 1;
				return (
					<label>
						<Radio
							type="radio"
							value={givenRating}
							onClick={() => {
								setRate(givenRating);
								give_rating(givenRating);
							}}
						/>
						<Rating>
							<FaStar size={20}
								color={
									givenRating < rate || givenRating === rate
										? "gold"
										: "silver"
								}
							/>
						</Rating>
					</label>
				);
			})}
		</Container>
	);
};

export default Ratings;