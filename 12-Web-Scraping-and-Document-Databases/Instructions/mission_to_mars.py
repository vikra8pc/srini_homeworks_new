#!/usr/bin/env python
# coding: utf-8

# In[1]:


from bs4 import BeautifulSoup as bs
import requests
from splinter import Browser
from time import sleep
import pandas as pd
import numpy as np

import pymongo


# In[2]:


url = 'https://mars.nasa.gov/news/'


# In[3]:


# Retrieve page with the requests module
response = requests.get(url)
# Create BeautifulSoup object; parse with 'lxml'
soup = bs(response.text, 'lxml')


# In[4]:


type(soup)
print(soup.prettify())


# In[5]:


# Retrieve the parent divs for all news
# results = soup.find('ul', class_='item_list')
title = soup.find("div",class_="content_title").text
news = soup.find('div', class_='rollover_description_inner').text
print(title)
print(news)


# In[6]:


executable_path = {'executable_path': 'chromedriver.exe'}
browser = Browser('chrome', **executable_path, headless=True)


# In[7]:


url = 'https://www.jpl.nasa.gov/spaceimages/?search=&category=Mars'
browser.visit(url)


# In[8]:



browser.click_link_by_partial_text('FULL IMAGE')
sleep(10)


# In[9]:


browser.click_link_by_partial_text('more info')
sleep(10)


# In[10]:


browser.click_link_by_partial_text('.jpg')


# In[ ]:


soup = bs(browser.html, 'html.parser')
featured_img_url = soup.find('img').get('src')
print(featured_img_url)


# In[ ]:


url = 'https://twitter.com/marswxreport?lang=en'


# In[ ]:


response = requests.get(url)
# Create BeautifulSoup object; parse with 'lxml'
soup = bs(response.text, 'lxml')

mars_weather = soup.find_all('p',                              class_ = "TweetTextSize TweetTextSize--normal js-tweet-text tweet-text")[0].text
# <p class="TweetTextSize TweetTextSize--normal js-tweet-text tweet-text" lang="en" data-aria-label-part="0">Sol 2312 (2019-02-06), high -13C/8F, low -72C/-97F, pressure at 8.13 hPa, daylight 06:47-18:53<a href="https://t.co/QpQemcmmJW" class="twitter-timeline-link u-hidden" data-pre-embedded="true" dir="ltr">pic.twitter.com/QpQemcmmJW</a></p>
print(mars_weather)


# In[11]:


url = 'https://space-facts.com/mars/'
tables = pd.read_html(url)
# print(tables)
df = tables[0]
df.columns=['name','value']
df['name']= df['name'].str.replace(':','')
df


# In[13]:


l_mars = df.to_dict('records')



# The default port used by MongoDB is 27017
# https://docs.mongodb.com/manual/reference/default-mongodb-port/
conn = 'mongodb://localhost:27017'
client = pymongo.MongoClient(conn)

db = client.vikas
collection = db.Personal
for rec in l_mars:
    collection.insert_one(rec)




