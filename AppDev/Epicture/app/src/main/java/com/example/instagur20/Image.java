package com.example.instagur20;

public class Image {
    private String mImageUrl;
    private String mCreator;
    private int mLikes;
    private int mComment;
    private int mFavorite_count;
    private String mId;

    public Image(String imageUrl, String creator, int likes, int comment, int favorite_count, String id) {
        mImageUrl = imageUrl;
        mCreator = creator;
        mLikes = likes;
        mComment = comment;
        mFavorite_count = favorite_count;
        mId = id;
    }

    public String getImageUrl() {
        return mImageUrl;
    }

    public String getCreator() {
        return mCreator;
    }

    public int getLikeCount() {
        return mLikes;
    }

    public String getId() {
        return this.mId;
    }

    public int getCommentCount() {
        return mComment;
    }

    public int getFavoriteCount() {
        return mFavorite_count;
    }
}