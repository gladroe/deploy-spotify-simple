import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShuffle } from "@fortawesome/free-solid-svg-icons";

const ShuffleButton = () => {
	const [isShuffled, setIsShuffled] = React.useState(false);

	const handleShuffleClick = () => {
		setIsShuffled(!isShuffled);
	};

	return (
		<div onClick={handleShuffleClick}>
			{isShuffled ? (
				<>
					<FontAwesomeIcon
						icon={faShuffle}
						style={{ color: "gray" }}
					/>
				</>
			) : (
				<>
					<FontAwesomeIcon icon={faShuffle} />
				</>
			)}
		</div>
	);
};

export default ShuffleButton;
