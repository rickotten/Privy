from django.urls import path, include, re_path
from .api import RegisterAPI, LoginAPI, UserAPI, exchange_token, ForgotAPI, UserPostCreateAPI, UserPostGetAPI, UserPostUpdateAPI
from knox import views as knox_views

urlpatterns = [
    re_path(r'social/(?P<backend>[^/]+)/$', exchange_token),
    path("api/auth", include("knox.urls")),
    path("api/auth/register", RegisterAPI.as_view()),
    path("api/auth/login", LoginAPI.as_view()),
    path('api/auth/user', UserAPI.as_view()),
    path('api/auth/logout', knox_views.LogoutView.as_view(), name='knox_logout'),
    path('api/auth/forgot', ForgotAPI.as_view()),
    path('api/auth/posts', UserPostCreateAPI.as_view()),
    re_path('api/auth/userposts/(?P<pk>\d+)$', UserPostUpdateAPI.as_view()),
    re_path('api/auth/userposts', UserPostGetAPI.as_view())
]
