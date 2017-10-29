

/usr/bin/mosquitto_pub -p 1880 -t "/cloud/62/plug/status" -m "{\"device_name\":\"ESP_00123451\", \"type\":\"plug\", \"state\":1}"
/usr/bin/mosquitto_pub -p 1880 -t "/cloud/62/plug/status" -m "{\"device_name\":\"ESP_00123452\", \"type\":\"plug\", \"state\":0}"

/usr/bin/mosquitto_pub -p 1880 -t "/cloud/62/irritool/status" -m "{\"device_name\":\"ESP_00222222\", \"type\":\"irritool\", \"time1\":0, \"time2\":1,\"time3\":2,\"time4\":3}"
/usr/bin/mosquitto_pub -p 1880 -t "/cloud/62/irritool/status" -m "{\"device_name\":\"ESP_00123454\", \"type\":\"irritool\", \"time1\":4, \"time2\":5,\"time3\":6,\"time4\":7}"

/usr/bin/mosquitto_pub -p 1880 -t "/cloud/62/sensor" -m "{\"device_name\":\"ESP_00222222\", \"type\":\"dth\", \"temperature\":22.5, \"humidity\":55.9}"
/usr/bin/mosquitto_pub -p 1880 -t "/cloud/62/sensor" -m "{\"device_name\":\"ESP_00123454\", \"type\":\"dth\", \"temperature\":34.5, \"humidity\":78.9}"


/usr/bin/mosquitto_pub -p 1880 -t "/cloud/62/device/status" -m "{\"device_name\":\"ESP_00123451\", \"type\":\"plug\",\"ipaddress\":\"192.168.1.1\", \"bgn\":3, \"uptime\": 100, \"version\":\"1.1.1\", \"sdk\":\"1.2.0\"}"
/usr/bin/mosquitto_pub -p 1880 -t "/cloud/62/device/status" -m "{\"device_name\":\"ESP_00123452\", \"type\":\"plug\",\"ipaddress\":\"192.168.1.2\", \"bgn\":3, \"uptime\": 200, \"version\":\"1.1.1\", \"sdk\":\"1.2.1\"}"
/usr/bin/mosquitto_pub -p 1880 -t "/cloud/62/device/status" -m "{\"device_name\":\"ESP_00222222\", \"type\":\"irritool\",\"ipaddress\":\"192.168.1.3\", \"bgn\":3, \"uptime\": 300, \"version\":\"1.1.1\", \"sdk\":\"1.3.0\"}"
/usr/bin/mosquitto_pub -p 1880 -t "/cloud/62/device/status" -m "{\"device_name\":\"ESP_00123454\", \"type\":\"irritool\",\"ipaddress\":\"192.168.1.4\", \"bgn\":3, \"uptime\": 400, \"version\":\"1.1.1\", \"sdk\":\"1.3.1\"}"



/usr/bin/mosquitto_pub -p 1880 -t "/cloud/62/irritool/cronrecord" -m "{\"device_name\":\"ESP_00222222\", \"type\":\"irritool\", \"cron_records\":[{\"m\":\"10\",\"h\":\"0\", \"dom\":\"255\",\"M\":\"255\", \"dow\":\"255\",\"vid\":\"0\",\"d\":\"100\",\"S\":\"1\",\"s\":\"0\",\"i\":\"0\"}, {\"m\":\"14\",\"h\":\"22\", \"dom\":\"255\",\"M\":\"255\", \"dow\":\"255\",\"vid\":\"2\",\"d\":\"200\",\"S\":\"2\",\"s\":\"0\",\"i\":\"1\"}]}"
