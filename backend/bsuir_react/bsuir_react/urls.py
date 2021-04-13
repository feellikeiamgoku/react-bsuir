
from django.contrib import admin
from django.urls import path, include

from rest_framework import routers

from clients.views import CityViewSet, CitizenshipViewSet, FamilyStatusViewSet, DisabilityViewSet, ClientViewSet

router = routers.SimpleRouter()
router.register(r'city', CityViewSet)
router.register(r'citizenship', CitizenshipViewSet)
router.register(r'family', FamilyStatusViewSet)
router.register(r'disability', DisabilityViewSet)
router.register(r'client', ClientViewSet, 'Client')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls))
]