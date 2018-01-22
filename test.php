<?php

$server = new swoole_websocket_server("0.0.0.0",1996);

$server -> on("open",function(swoole_websocket_server $server,$request){

	echo  "server: handshake success with fd{$request->fd}".time()."\n";

});


$server ->on("message",function($server,$frame){
	echo "receive from {$frame->fd}:{$frame->data},opcode:{$frame->opcode},fin:{$frame->finish}\n";
	$server->push($frame->fd,"This is server");
});

$server->on('close', function ($server, $fd) {
    echo "client {$fd} closed\n";
});




$server->start();