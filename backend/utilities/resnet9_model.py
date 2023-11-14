import torch 
import torch.nn as nn
import torch.nn.functional as F

# Define a basic convolutional block
def ConvBlock(in_channels, out_channels, pool=False):
    layers = [
        nn.Conv2d(in_channels, out_channels, kernel_size=3, padding=1),
        nn.BatchNorm2d(out_channels),
        nn.ReLU(inplace=True)
    ]
    if pool:
        layers.append(nn.MaxPool2d(4))
    return nn.Sequential(*layers)

# Define the ResNet9 model
class ResNet9(nn.Module):
    def __init__(self, in_channels, num_classes):
        super(ResNet9, self).__init__()
        
        # Initial convolution block
        self.conv1 = ConvBlock(in_channels, 64)
        
        # Convolution block with pooling
        self.conv2 = ConvBlock(64, 128, pool=True)  # Output dimension: 128 x 64 x 64
        
        # Residual block 1
        self.res1 = nn.Sequential(ConvBlock(128, 128), ConvBlock(128, 128))
        
        # Convolution block with pooling
        self.conv3 = ConvBlock(128, 256, pool=True)  # Output dimension: 256 x 16 x 16
        
        # Convolution block with pooling
        self.conv4 = ConvBlock(256, 512, pool=True)  # Output dimension: 512 x 4 x 4
        
        # Residual block 2
        self.res2 = nn.Sequential(ConvBlock(512, 512), ConvBlock(512, 512))
        
        # Classifier
        self.classifier = nn.Sequential(
            nn.MaxPool2d(4),
            nn.Flatten(),
            nn.Linear(512, num_classes)
        )
    
    def forward(self, x):  # x is the input batch
        # Forward pass through the network
        out = self.conv1(x)
        out = self.conv2(out)
        out = self.res1(out) + out
        out = self.conv3(out)
        out = self.conv4(out)
        out = self.res2(out) + out
        out = self.classifier(out)
        return out