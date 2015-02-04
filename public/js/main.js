var socket = io();
var $formChat = $('#messageForm'),
	$msgInput = $formChat.find('[name=message]'),
	$list = $('#messageList'),
	$formLogin = $('#formLogin'),
	$nicknameInput = $formLogin.find("[name=nickname]"),
	$avatar = $formLogin.find('[name=avatar]'),
	$intro = $("#intro"),
	$chat = $("#chatRoom"),
	$typing = $('#typing');

var currentUser = {
	nickname: '',
	avatar: ''
};

$formLogin.on('submit', function(e) {
	e.preventDefault();
	
	var _nickname = $nicknameInput.val().trim();
	var _avatar = $avatar.val().trim();

	if (_nickname != '' && _avatar != '') {
		currentUser.nickname = _nickname; currentUser.avatar = _avatar;
		socket.emit("register", currentUser);
		$intro.hide();
		$chat.show();
	} else {
		alert("Please input nickname and avatar");
	}
});

$formChat.on('submit', function(e) {
	e.preventDefault();
	var msg = $msgInput.val();
	if (msg.trim == '') return false;
	socket.emit('message', msg);
	appendChat({
		message: msg,
		nickname: 'You',
		avatar: currentUser.avatar,
		template: 'message'
	});
	$msgInput.val('');
});

socket.on('message', function(data) {
	data.template = 'message';
	appendChat(data);
});

$msgInput.on('keyup', function() {
	socket.emit('typing');
});

socket.on('typing', function(username) {

	if ($typing.find('.' + username + '-typing').length > 0) return;

	var $el = $(templatesFactory('status')({
			message: username + ' is typing...',
			status: 'info ' + username + '-typing'
		}));

	$typing.append($el);
	setTimeout(function() {

		$el.fadeOut(200, function() { $el.remove() });
	}, 1000);
});

socket.on('user left', function(username) {
	appendChat({
		message: username + " has left",
		status: 'warning',
		template: 'status'
	})
});

socket.on('register', function(username) {
	appendChat({
		message: username + " has join",
		status: 'success',
		template: 'status'
	})
});

socket.on('connected', function(count) {
	console.log(count);
});

function appendChat(data) {
	if (data.nickname != undefined && $list.data('current-nickname') === data.nickname) {
		$list.find('.media').last().find('.media-body').append('<p>' + data.message + '</p>');
	}
	else {
		$list.append(templatesFactory(data.template)(data));
		if (data.username == undefined) {
			$list.data('current-nickname', data.nickname);
		}
	}
}
function templatesFactory(templateKey) {
	if (templateKey == undefined) return false;
	return JST[templateKey];
}


$('#fileupload').fileupload({
	dataType: 'json',
	done: function (e, data) {
		if (data.result.status == 'success') {
			$formLogin.find('[name=avatar]').val(data.result.filepath);
			$('.avatar-placeholder').html($('<img>').attr('src', data.result.filepath));
		}
	},
	formData: {"move-to-folder": "images/users/"}
});