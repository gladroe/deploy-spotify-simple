import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCirclePlay,
	faCirclePause,
	faBackwardStep,
	faForwardStep,
	faShuffle,
	faRepeat,
} from "@fortawesome/free-solid-svg-icons";
import { songsArray } from "../../api/api";

const formatTime = (timeInSeconds) => {
	const minutes = Math.floor(timeInSeconds / 60)
		.toString()
		.padStart(2, "0");
	const seconds = Math.floor(timeInSeconds - minutes * 60)
		.toString()
		.padStart(2, "0");

	return `${minutes}:${seconds}`;
};

const timeInSeconds = (timeString) => {
	const splitArray = timeString.split(":");
	const minutes = Number(splitArray[0]);
	const seconds = Number(splitArray[1]);

	return minutes * 60 + seconds;
};

const Player = ({
	duration,
	randomIdFromArtist,
	randomId2FromArtist,
	audio,
	artist,
}) => {
	const audioPlayer = useRef();
	const progressBar = useRef();
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentTime, setCurrentTime] = useState(formatTime(0));
	const [isShuffle, setShuffle] = useState(false);

	const durationInSeconds = timeInSeconds(duration);

	const playPause = () => {
		isPlaying ? audioPlayer.current.pause() : audioPlayer.current.play();
		setIsPlaying(!isPlaying);
	};

	useEffect(() => {
		const intervalId = setInterval(() => {
			if (isPlaying)
				setCurrentTime(formatTime(audioPlayer.current.currentTime));

			progressBar.current.style.setProperty(
				"--_progress",
				`${
					(audioPlayer.current.currentTime / durationInSeconds) * 100
				}%`
			);
		}, 1000);

		return () => clearInterval(intervalId);
	}, [isPlaying]);

	const handleSkip = async (randomIdFromArtist, randomId2FromArtist) => {
		audioPlayer.current.pause();
		audioPlayer.current.currentTime = 0;
		progressBar.current.style.setProperty("--_progress", "0%");
		setCurrentTime(formatTime(0));

		if (randomIdFromArtist) {
			audioPlayer.current.play();
			setIsPlaying(true);
		}

		if (randomId2FromArtist) {
			await audioPlayer.current.play();
			setIsPlaying(true);
		}
	};

	const handleShuffleClick = () => {
		setShuffle(!isShuffle);
	};

	return (
		<div className="player">
			<div className="player__controllers">
				<Link to={`/song/${randomIdFromArtist}`}>
					<FontAwesomeIcon
						className="player__icon"
						icon={faBackwardStep}
						onClick={() => handleSkip(randomIdFromArtist)}
					/>
				</Link>
				<FontAwesomeIcon
					className="player__icon player__icon--play"
					icon={isPlaying ? faCirclePause : faCirclePlay}
					onClick={() => playPause()}
				/>

				<Link to={`/song/${randomId2FromArtist}`}>
					<FontAwesomeIcon
						className="player__icon"
						icon={faForwardStep}
						onClick={() => handleSkip(randomId2FromArtist)}
					/>
				</Link>
			</div>

			<div className="player__progress">
				<p>{currentTime}</p>

				<div className="player__bar">
					<div
						ref={progressBar}
						className="player__bar-progress"></div>
				</div>

				<p>{duration}</p>
			</div>

			<audio ref={audioPlayer} src={audio}></audio>
		</div>
	);
};

export default Player;
