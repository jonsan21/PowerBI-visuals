﻿/*
 *  Power BI Visualizations
 *
 *  Copyright (c) Microsoft Corporation
 *  All rights reserved. 
 *  MIT License
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the ""Software""), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *   
 *  The above copyright notice and this permission notice shall be included in 
 *  all copies or substantial portions of the Software.
 *   
 *  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */

/// <reference path="../_references.ts"/>

module powerbi.visuals {
    export interface LabelsBehaviorOptions {
        labelItems: D3.Selection;
    }

    export class LabelsBehavior implements IInteractiveBehavior {
        public static DefaultLabelOpacity = 1;
        public static DimmedLabelOpacity = 0.6;
        private labelItems: D3.Selection;

        public bindEvents(options: LabelsBehaviorOptions, selectionHandler: ISelectionHandler): void {
            this.labelItems = options.labelItems;

            this.labelItems.on('click', (d: Label) => {
                selectionHandler.handleSelection(d, d3.event.ctrlKey);
            });
        }

        public renderSelection(hasSelection: boolean): void {
            if (hasSelection) {
                this.labelItems.style({
                    'opacity': (d: Label) => {
                        if (!d.selected)
                            return LabelsBehavior.DimmedLabelOpacity;
                        else
                            return LabelsBehavior.DefaultLabelOpacity;;
                    }
                });
            }
            else {
                this.labelItems.style({
                    'opacity': LabelsBehavior.DefaultLabelOpacity,
                });
            }
        }
    }
}
