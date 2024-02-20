# L&S: D3 Introduction 

## Structure
### [`best-practice-example`](best-practice-example) 
Contains sample code for a bar plot and a scatter plot, i.e. the "go-to" plots for effective statistical graphics for 1D and 2D data.

### [`pie-and-bar-plot`](pie-and-bar-plot) 
Contains code for pie and bar plot for illustration purposes

Task: try to find out, how much larger the usage of flamingos is compared to hearts with each plot). 

I HIGHLY recommend using a bar plot instead of pie chart in most cases though.


## Set up
### Create virtual environment (recommended)
This is recommended to avoid conflicts with other projects.
```bash
python3 -m venv venv
source venv/bin/activate
```

### Install dependencies
```bash
pip install -r requirements.txt
```

## Execute server to display plots
From within `best-practice-example`
```bash
python -m uvicorn app:app --reload
```



## TODOs
- [ ] Add plots
- [ ] add exact instructions how to set up env and run code
- [ ] Add comments
- [ ] Final cleanup
- [x] pin versions in requirements.txt