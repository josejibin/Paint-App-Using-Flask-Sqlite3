

import os
import sqlite3
from flask import Flask,request,g,redirect,url_for,render_template,flash,session,jsonify,g,Response

app = Flask(__name__)


app.config.from_object(__name__)

app.config.update(dict(
   DATABASE=os.path.join(app.root_path,'gallery.db'),
   DEBUG=True,
   SECRET_KEY='jibin jose',
   
  
))
app.config.from_envvar('FLASKR_SETTINGS',silent=True)



def connect_db():
  rv=sqlite3.connect(app.config['DATABASE'])
  rv.row_factory=sqlite3.Row
  return rv

def init_db():
  with app.app_context():
     db=get_db()
     with app.open_resource('schema.sql',mode='r')as f:
	db.cursor().executescript(f.read())
     db.commit()

def get_db():
  if not hasattr(g,'sqlite_db'):
     g.sqlite_db=connect_db()
  return g.sqlite_db



@app.route('/')
def home():
  db=get_db()
  cur = db.execute('select * from images ORDER BY id desc')
  posts=[dict(id=i[0],title=i[1]) for i in cur.fetchall()]
  print posts
  db.commit()
  return render_template('paint.html',posts=posts)


@app.route("/gallery/<imagename>",methods=["GET", "POST"])
def LoadSaveImage(imagename=None):
  if request.method=="POST":	
    print "in posts"
    db=get_db()
    db.execute('insert into images (title,img_data) values (?,?)',[request.form["pname"],request.form["pdata"]])
    db.commit()
    flash(' Details added')
    return render_template('paint.html')

  else:
    print "in get"
    if imagename:
      filename=(imagename,)
      t=0
      db=get_db()
      cur = db.execute('select title,img_data from images where title = (?)',[imagename])
      comments=[cur.fetchall()]
      t=t+1
      if t>0:   
        data=""
        print "name="+str(filename)
        cur = db.execute('select title,img_data from images where title = (?)',[imagename])
        comments=[cur.fetchall()]
        
     
        name = comments[0][0][0]
        data = comments[0][0][1]
        print name
        print data
        
        resp = Response("""<script>var data=JSON.parse(' """+data+""" ');</script>"""+render_template("paint.html"), status=200, mimetype='html')
        print resp
        return resp         
      else:
        return "Image not Found"
    else:
      return render_template("paint.html")





if __name__=='__main__':
 app.run(debug=True)
