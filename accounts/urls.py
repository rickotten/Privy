from .api import (FriendRequestAPI,
                            RegisterAPI,
                             LoginAPI,
                            UserAPI,
                            exchange_token,
                            ForgotAPI,
                            UserPostCreateAPI,
                            UserPostGetAPI,
                            UserPostUpdateAPI,
                            UserPostCommentAPI,
                            UserPostLikeAPI,
                            GetUserProfileAPI,
                            UserPostGetFriendsAPI,
                            PageAPI,
                            UserSearchAPI,
                            UserSearchFOFAPI,
                            UserSearchPostsAPI,
                            UserSearchPagesAPI,
                            UpdateProfilePictureAPI,
                            GetUserPagesAPI)
from django.urls import path, include, re_path
from knox import views as knox_views

urlpatterns = [
    re_path(r'social/(?P<backend>[^/]+)/$', exchange_token),
    path("api/auth", include("knox.urls")),
    path("api/auth/register", RegisterAPI.as_view()),
    path("api/auth/login", LoginAPI.as_view()),
    path('auth/user', UserAPI.as_view()),
    path('api/auth/logout', knox_views.LogoutView.as_view(), name='knox_logout'),
    path('api/auth/forgot', ForgotAPI.as_view()),
    path('api/auth/posts', UserPostCreateAPI.as_view()),
    path('api/auth/userposts/like', UserPostLikeAPI.as_view()),
    path('api/auth/userposts/comment', UserPostCommentAPI.as_view()),
    # re_path('api/auth/userposts/(?P<pk>\d+)$', UserPostUpdateAPI.as_view()),
    path('updateProfilePicture', UpdateProfilePictureAPI.as_view()),
    path('profiles/<str:username>', GetUserProfileAPI.as_view()),
    path('api/auth/friendRequest', FriendRequestAPI.as_view()),
    ################################################
    #To use these queries, use this example:
    #/searchname/?search=username or /searchemail/?search=email (except for searching FoF)
    #it looks for names/emails containing the given argument
    path('searchuser/', UserSearchAPI.as_view()),
    re_path('searchfriendsoffriends/(?P<username>\w+)$', UserSearchFOFAPI.as_view()),
    path('searchposts/', UserSearchPostsAPI.as_view()),
    path('searchpages/', UserSearchPagesAPI.as_view()),
    #######################################################
    re_path('api/auth/home/(?P<username>\w+)$', UserPostGetFriendsAPI.as_view()),
    re_path('api/auth/(?P<username>\w+)$', UserPostGetAPI.as_view()),
    path('pages', PageAPI.as_view()),
    path('pages/<int:page_id>', PageAPI.as_view()),
    path('userpages', GetUserPagesAPI.as_view())
]
