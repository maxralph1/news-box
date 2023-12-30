from rest_framework import permissions


class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True

        return obj.added_by == request.user


class IsSuperUser(permissions.BasePermission):
    # Custom permission to only allow super user access.
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True

        return request.user.is_superuser == True
    


# class CustomPermissionClass(permissions.BasePermission):
#     def has_permission(self, request, view):
#         if request.method == 'GET':
#             # logic for GET method
#             pass
#         elif request.method == 'POST':
#             return request.user
#             # pass
#         elif request.method == 'PUT':
#             # logic for POST metod
#             # return request.user.is_superuser
#             pass
#         elif request.method == 'DELETE':
#             # logic for POST metod
#             return request.user.is_superuser
#             pass
#         # default logic