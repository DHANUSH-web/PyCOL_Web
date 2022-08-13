from django.shortcuts import HttpResponse, render


# Create your views here.
def home(request):
    return render(request, "home.html")


def about(request):
    return HttpResponse("This is a simple website under development process")


def contact(request):
    return HttpResponse("Please write us a mail to contact with our admins <b><a href='mailto:contact.admin@gmail.com'>Contact</a></b>")
