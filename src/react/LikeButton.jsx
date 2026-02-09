// src/react/LikeButton.jsx
import React, { useState, useEffect } from "react";
import { ref, onValue, runTransaction } from "firebase/database";
import { db } from "../firebase";

const LikeButton = () => {
    const [likes, setLikes] = useState(0);
    const [hasLiked, setHasLiked] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        if (localStorage.getItem("portfolio_liked_utsav")) {
            setHasLiked(true);
        }
        const likesRef = ref(db, "stats/likes");
        const unsubscribe = onValue(likesRef, (snapshot) => {
            setLikes(snapshot.val() || 0);
        });
        return () => unsubscribe();
    }, []);

    const handleLike = (e) => {
        if (e) e.stopPropagation();

        if (hasLiked) return;

        const likesRef = ref(db, "stats/likes");
        runTransaction(likesRef, (current) => (current || 0) + 1).then(() => {
            setHasLiked(true);
            localStorage.setItem("portfolio_liked_utsav", "true");
        });
    };

    if (!isClient) return <span>🤍 ...</span>;

    return (
        <div onClick={handleLike} className="flex items-center gap-2">
            <span>{hasLiked ? "❤️" : "🤍"}</span>
            <span className="font-medium">{likes} Likes</span>
        </div>
    );
};

export default LikeButton;
