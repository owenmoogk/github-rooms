def my_jwt_response_handler(token, user=None, request=None):
    return {
        'token': token,
        'user': {"username": request.user.username}
    }