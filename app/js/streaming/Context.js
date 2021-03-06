/*
 * The copyright in this software is being made available under the BSD License, included below. This software may be subject to other third party and contributor rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Digital Primates
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
 * •  Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 * •  Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
 * •  Neither the name of the Digital Primates nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS “AS IS” AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
MediaPlayer.di.Context = function () {
    "use strict";

    var mapProtectionModel = function() {
        var videoElement = document.createElement("video"),
            debug = this.system.getObject("debug");

        /* @if PROTECTION=true */
        // Detect EME APIs.  Look for newest API versions first
        if (MediaPlayer.models.ProtectionModel_21Jan2015.detect(videoElement)) {
            this.system.mapSingleton('protectionModel', MediaPlayer.models.ProtectionModel_21Jan2015);
        } else if (MediaPlayer.models.ProtectionModel_3Feb2014.detect(videoElement)) {
            this.system.mapClass('protectionModel', MediaPlayer.models.ProtectionModel_3Feb2014);
        } else if (MediaPlayer.models.ProtectionModel_01b.detect(videoElement)) {
            this.system.mapClass('protectionModel', MediaPlayer.models.ProtectionModel_01b);
        } else {
            debug.log("No supported version of EME detected on this user agent!");
            debug.log("Attempts to play encrypted content will fail!");
        }
        /* @endif */
    };

    return {
        system : undefined,
        setup : function () {
            this.system.autoMapOutlets = true;

            // MediaPlayer.utils.*
            this.system.mapSingleton('capabilities', MediaPlayer.utils.Capabilities);
            this.system.mapSingleton('config', MediaPlayer.utils.Config);
            this.system.mapSingleton('debug', MediaPlayer.utils.Debug);
            this.system.mapSingleton('debugController', MediaPlayer.utils.DebugController);
            this.system.mapClass('domParser', MediaPlayer.utils.DOMParser);
            this.system.mapSingleton('eventBus', MediaPlayer.utils.EventBus);
            this.system.mapSingleton('textTrackExtensions', MediaPlayer.utils.TextTrackExtensions);
            this.system.mapSingleton('tokenAuthentication', MediaPlayer.utils.TokenAuthentication);
            this.system.mapSingleton('vttParser', MediaPlayer.utils.VTTParser);
            this.system.mapSingleton('ttmlParser', MediaPlayer.utils.TTMLParser);

            // MediaPlayer.models.*
            this.system.mapSingleton('manifestModel', MediaPlayer.models.ManifestModel);
            this.system.mapClass('metrics', MediaPlayer.models.MetricsList);
            this.system.mapSingleton('metricsModel', MediaPlayer.models.MetricsModel);
            this.system.mapSingleton('uriQueryFragModel', MediaPlayer.models.URIQueryAndFragmentModel);
            this.system.mapSingleton('videoModel', MediaPlayer.models.VideoModel);

            // MediaPlayer.dependencies.*
            this.system.mapSingleton('abrController', MediaPlayer.dependencies.AbrController);
            this.system.mapClass('bufferController', MediaPlayer.dependencies.BufferController);
            this.system.mapSingleton('bufferExt', MediaPlayer.dependencies.BufferExtensions);
            this.system.mapSingleton('errHandler', MediaPlayer.dependencies.ErrorHandler);
            this.system.mapClass('eventController', MediaPlayer.dependencies.EventController);
            this.system.mapClass('fragmentController', MediaPlayer.dependencies.FragmentController);
            this.system.mapClass('fragmentInfoController', MediaPlayer.dependencies.FragmentInfoController);
            this.system.mapClass('fragmentLoader', MediaPlayer.dependencies.FragmentLoader);
            this.system.mapClass('fragmentModel', MediaPlayer.dependencies.FragmentModel);
            this.system.mapClass('manifestLoader', MediaPlayer.dependencies.ManifestLoader);
            this.system.mapSingleton('manifestUpdater', MediaPlayer.dependencies.ManifestUpdater);
            this.system.mapSingleton('mediaSourceExt', MediaPlayer.dependencies.MediaSourceExtensions);
            this.system.mapSingleton('notifier', MediaPlayer.dependencies.Notifier);
            this.system.mapSingleton('sourceBufferExt', MediaPlayer.dependencies.SourceBufferExtensions);
            this.system.mapClass('stream', MediaPlayer.dependencies.Stream);
            this.system.mapSingleton('streamController', MediaPlayer.dependencies.StreamController);
            this.system.mapClass('textController', MediaPlayer.dependencies.TextController);
            this.system.mapSingleton('textSourceBuffer', MediaPlayer.dependencies.TextSourceBuffer);
            this.system.mapSingleton('textTTMLXMLMP4SourceBuffer', MediaPlayer.dependencies.TextTTMLXMLMP4SourceBuffer);
            this.system.mapSingleton('videoExt', MediaPlayer.dependencies.VideoModelExtensions);

            // MediaPlayer.dependencies.protection.*
            /* @if PROTECTION=true */
            this.system.mapClass('protectionController', MediaPlayer.dependencies.ProtectionController);
            this.system.mapSingleton('protectionExt', MediaPlayer.dependencies.ProtectionExtensions);
            this.system.mapSingleton('ksClearKey', MediaPlayer.dependencies.protection.KeySystem_ClearKey);
            this.system.mapSingleton('ksPlayReady', MediaPlayer.dependencies.protection.KeySystem_PlayReady);
            this.system.mapSingleton('ksWidevine', MediaPlayer.dependencies.protection.KeySystem_Widevine);
            this.system.mapSingleton('serverClearKey', MediaPlayer.dependencies.protection.servers.ClearKey);
            this.system.mapSingleton('serverDRMToday', MediaPlayer.dependencies.protection.servers.DRMToday);
            this.system.mapSingleton('serverPlayReady', MediaPlayer.dependencies.protection.servers.PlayReady);
            this.system.mapSingleton('serverWidevine', MediaPlayer.dependencies.protection.servers.Widevine);
            /* @endif */
            mapProtectionModel.call(this); // Determines EME API support and version

            // MediaPlayer.rules.*
            this.system.mapClass('abrRulesCollection', MediaPlayer.rules.BaseRulesCollection);
            this.system.mapClass('abandonRequestRule', MediaPlayer.rules.AbandonRequestsRule);
            this.system.mapClass('downloadRatioRule', MediaPlayer.rules.DownloadRatioRule);
            this.system.mapClass('droppedFramesRule', MediaPlayer.rules.DroppedFramesRule);
            this.system.mapClass('insufficientBufferRule', MediaPlayer.rules.InsufficientBufferRule);
            this.system.mapClass('limitSwitchesRule', MediaPlayer.rules.LimitSwitchesRule);

            // Dash.dependencies.*
            this.system.mapClass('baseURLExt', Dash.dependencies.BaseURLExtensions);
            this.system.mapClass('fragmentExt', Dash.dependencies.FragmentExtensions);
            this.system.mapClass('indexHandler', Dash.dependencies.DashHandler);
            this.system.mapSingleton('manifestExt', Dash.dependencies.DashManifestExtensions);
            //this.system.mapSingleton('metricsExt', Dash.dependencies.DashMetricsExtensions);
            this.system.mapSingleton('metricsExt', MediaPlayer.dependencies.MetricsExtensions);
            this.system.mapSingleton('timelineConverter', Dash.dependencies.TimelineConverter);

            this.system.mapSingleton('parser', MediaPlayer.dependencies.Parser);
            this.system.mapClass('dashParser', Dash.dependencies.DashParser);
            // @if MSS=true
            this.system.mapClass('mssParser', Mss.dependencies.MssParser);
            // @endif
            // @if HLS=true
            this.system.mapClass('hlsParser', Hls.dependencies.HlsParser);
            this.system.mapClass('hlsDemux', Hls.dependencies.HlsDemux);
            // @endif

            // Create the context manager to plug some specific parts of the code
            this.system.mapSingleton('contextManager', MediaPlayer.modules.ContextManager);

            // Plug message handler. When the message is notify, the contextManager is called
            this.system.mapHandler('setContext', 'contextManager', 'setContext');
        }
    };
};
