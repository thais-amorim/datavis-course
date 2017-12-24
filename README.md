# DataVis Course

This project contains all the homework assigments from the Data Visualization Course (2017.2) at Federal University of Ceará.

Demo: https://thasmarinho.github.io/datavis-course/

### Get Started

First access the exact folder where is the project:
```
cd [path-in-your-computer]/datavis-course
```

It is necessary to start any kind of HTTP server because all the visualizations are hosted in a website

Python 2.7.x

```
python -m SimpleHTTPServer
```

Python 3.x

```
python3 -m http.server
```

Maybe your computer does not recognize the command python3. If it happens, try this

```
py -m http.server
```

After the server starter successfully, you can access the website typing in your browser

```
localhost:8000
```

## Built With

* [D3.js](https://d3js.org/) - Used to generate charts
* [Crossfilter](http://square.github.io/crossfilter/) - Library for exploring large multivariate datasets
* [DC.js](https://dc-js.github.io/dc.js/) - Used to render charts in CSS-friendly SVG format
* [Leaflet.js](http://leafletjs.com/) - Used to render interactive maps
