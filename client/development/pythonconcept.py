import os
import json

cache = {} #empty example
# cache = {"messages": {"hello", "how are you"}}  Filled example
while True: # For exmple, using while true here is already a terrible idea in most cases IK THAT >m< its just to represent
#when the script is running. ignore it in the JS
    if cache == "":
        print("No cache found!") #this would be where log would print no content in JS
    # elif cache != "":
    else:
        print(json.loads("messages")) #replace print with html system to replace inner content of 
        #chat window with messages.

    # this would still do the exact same thing, no need to check twice. Alrrr
    # so now we translate it into JS. AHEM correction. You.

# This is basically it: Bruh. how the fuck. well we have our system now. lets add it to client.js :
if(cache){
    loadCache()
}

    # else: for example. if the file cant be accessed for cache. this is prob where wed catch it
        # wouldnt this never get executed? almost never. but if something breaks and it cant be
        #accessed it will do this. it bassically catches the error in js if something super unforseen happens
        # well.. no, because you are first checking if cache is an empty string, then if its not
        # there is no third condition to check, so the else is redundant, and cant ever happen
        # in python you catch errors with try just like in js IK like i said its yours to translate and fix
        #i dont have the tools i do with codespaces so
        #error = "error" #replace string with error so it displays proper error
        # print(f"Error {error}")

#normally im doing it in a codespace terminal enviroment so i dont have as much help or testing
#there is a json thing tho
# well but that is a string not array
# if your gonna be a smartass. then help ya nerd (im joking ish. your such a JS nerd tho)
# json is from js :) but used in 90% of languages
# js is better than python
#pythons easier to learn and code than js Durr
# thats why i used it over js for coding until i got back into contact with you
# i dont plan to actually use python rere. its a concept for you to follow to turn into a JS script
# to use  read
# well but the problem with python is that it doesnt really teach you how to code correctly
#done i gtg for a bit leaving LS open
# Okay :)
# ill have to go soon too alr
# 