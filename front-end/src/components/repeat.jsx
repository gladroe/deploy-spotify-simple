import React from "react";

const RepeatButton = () => {
	const [repeat, setRepeat] = React.useState(false);

	const handleRepeat = () => {
		setRepeat((prevRepeat) => !prevRepeat);
	};

	return (
		<div className="song">
			<div className="song__container">
				<div className="song__image-container">
					<img src={image} alt={`Image da musica ${name}`} />
				</div>
			</div>
			<div className="song__bar">
				<Link
					to={`/artist/${artistObj.id}`}
					className="song__artist-image">
					<img
						width="75px"
						height="75px"
						src={artistObj.image}
						alt={`Image do artista ${artist}`}
					/>
				</Link>

				<button className="song__repeat-button" onClick={handleRepeat}>
					{repeat ? "Desativar" : "Ativar"} Repetir
				</button>

				<Player
					duration={duration}
					randomIdFromArtist={randomIdFromArtist}
					repeat={repeat}
				/>

				<div>
					<p className="song__name">{name}</p>
					<p>{artist}</p>
				</div>
			</div>
		</div>
	);
};

export default RepeatButton;
