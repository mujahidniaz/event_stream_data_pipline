
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Windows.Forms;

namespace Even_Fire
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        public async System.Threading.Tasks.Task makeRequestAsync(Events e)
        {
            var httpWebRequest = (HttpWebRequest)WebRequest.Create("http://localhost:4000/api/v1//newevent");
            httpWebRequest.ContentType = "application/json";
            httpWebRequest.Method = "POST";

            using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
            {

                var json = JsonConvert.SerializeObject(e);
                streamWriter.Write(json);
            }

            var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
            using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
            {
                var result = streamReader.ReadToEnd();
            }

        }

        private void button1_Click(object sender, EventArgs e)
        {
            List<Events> evs = JsonConvert.DeserializeObject<List<Events>>(File.ReadAllText(@"C:\Users\MN186043\Desktop\Node Producer\Kafka_Producer\events.json"));
            int count = 0;
            screen.AppendText(evs.Count.ToString());

            foreach (Events evvvv in evs)
            {
                //var json = JsonConvert.SerializeObject(evvvv);
                // addDataToTable(evvvv);
                makeRequestAsync(evvvv);
                screen.AppendText(count.ToString() + " " + evvvv.Type + "\n");
                //if (count == 1000) { break; }
                count++;

            }
        }
    }

}
