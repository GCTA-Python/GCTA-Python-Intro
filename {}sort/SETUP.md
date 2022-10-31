# These instructions are for installing Python, creating a virtual environment, and installing Jupyter Notebook
1. Download the latest Python release for your operating system here: https://www.python.org/downloads/
2. Run the installer
3. Setup a virtual environment by running: python -m venv venv
  a. (if step 3 says that virtualenv is not installed) Pip install the python package that we will use for managing virtual environments by running this command: pip3 install virtualenv
4. Activate the virtual environment by running (windows): .\venv\Scripts\activate
5. Install the dependencies that I have defined in requirements.txt by running: pip3 install -r requirements.txt
6. Start running Jupyter notebook by running the command: jupyter notebook
