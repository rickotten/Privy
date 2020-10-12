from django.urls import path, include, re_path
from .api import RegisterAPI, LoginAPI, UserAPI, exchange_token
from knox import views as knox_views

urlpatterns = [
    # url('complete/' + r'social/(?P<backend>[^/]+)/$', exchange_token),
    re_path(r'social/(?P<backend>[^/]+)/$', exchange_token),
    path("api/auth", include("knox.urls")),
    path("api/auth/register", RegisterAPI.as_view()),
    path("api/auth/login", LoginAPI.as_view()),
    path('api/auth/user', UserAPI.as_view()),
    path('api/auth/logout', knox_views.LogoutView.as_view(), name='knox_logout')
]
